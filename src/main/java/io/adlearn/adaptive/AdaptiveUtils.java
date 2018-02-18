package io.adlearn.adaptive;

import io.adlearn.entity.LearnDataDictEntry;
import io.adlearn.entity.LearnDictResult;
import io.adlearn.entity.LearnDictResultConnection;
import io.adlearn.entity.UserLearnData;
import lombok.Data;
import org.apache.commons.math3.stat.descriptive.moment.Mean;
import org.apache.commons.math3.stat.regression.SimpleRegression;

import java.util.*;
import java.util.stream.Collectors;

public class AdaptiveUtils {
    /**
     * Default count of words
     */
    private static final int WORDS_PER_STEP = 7;

    /**
     * How many last learning attempts determines count of words
     */
    private static final int WORDS_RESULTS_SLICE = 8;

    /**
     * Handles initial dictionary data and adopt it to user. It will change the source object.
     *
     * @param data initial dictionary data.
     */
    public static void adaptDictionary(UserLearnData data) {
        int wordsPerAttempt = adoptWordsCountPerAttempt(data);

        System.out.println("Words per attemp = " + wordsPerAttempt);

        int resultsCount = data.getResults().size();

        List<WordLearnProgress> wordsProgress = new ArrayList<>();

        for (LearnDataDictEntry entry : data.getData().getDictionary().getEntries()) {
            int learnTime = -1;
            boolean lastResult = false;

            if (resultsCount > 0) {
                ListIterator<LearnDictResult> iterator = data.getResults().listIterator(resultsCount);

                while (iterator.hasPrevious()) {
                    Optional<LearnDictResultConnection> connection = iterator.previous().getConnections().stream().parallel().filter(c -> c.getEntry().getId().equals(entry.getId())).findAny();

                    if (connection.isPresent()) {
                        learnTime = iterator.previousIndex() + 1;
                        lastResult = connection.get().isValue();
                        break;
                    }
                }
            }

            double longAgo = resultsCount > 0 ? ((double)learnTime + 1.0) / (double)resultsCount : 0.0;

            wordsProgress.add(new WordLearnProgress(entry, longAgo, lastResult));
        }

//        System.out.println("Before sorting: ");
//        System.out.println(wordsProgress);

        wordsProgress = wordsProgress.stream().sorted(Comparator
                .comparing(WordLearnProgress::getLongAgo).thenComparing(WordLearnProgress::isResultValue))
                .collect(Collectors.toList());

//        System.out.println("After sorting: ");
//        System.out.println(wordsProgress);

        int wordsCount = wordsProgress.size();

        List<LearnDataDictEntry> resultEntries;
        /*= wordsProgress.stream()
                .map(WordLearnProgress::getEntry)
                .skip(wordsCount - wordsPerAttempt)
                .collect(Collectors.toList());*/

        List<WordLearnProgress> newWordsProgress = wordsProgress.stream()
                .filter(pr -> Double.compare(pr.getLongAgo(), 0.0) == 0)
                .collect(Collectors.toList());

        System.out.println(newWordsProgress);

        if (newWordsProgress.size() < wordsPerAttempt) {
            resultEntries = wordsProgress.stream()
                    .map(WordLearnProgress::getEntry)
                    .limit(wordsPerAttempt)
                    .collect(Collectors.toList());
        } else {
            resultEntries = newWordsProgress.stream()
                    .map(WordLearnProgress::getEntry)
                    .limit(wordsPerAttempt)
                    .collect(Collectors.toList());
        }

        data.getData().getDictionary().setEntries(resultEntries);

    }

    private static int adoptWordsCountPerAttempt(UserLearnData data) {
        List<LearnDictResult> results = data.getResults();

        int resultsCount = results.size();

        double intercept = WORDS_PER_STEP;

        if (resultsCount > 1) {
            boolean hasOnceFalse = false;

            int resultsFromIndex = Math.max(0, resultsCount - WORDS_RESULTS_SLICE);

            Mean mean = new Mean();

            SimpleRegression regression = new SimpleRegression();

            for (LearnDictResult result : results.subList(resultsFromIndex, results.size())) {

                long n = result.getConnections().size();
                long countFalses = result.getConnections().stream().filter(conn -> !conn.isValue()).count();

                regression.addData(countFalses, n - countFalses);
                mean.increment(n - countFalses);

                if (!hasOnceFalse && countFalses == 1) {
                    hasOnceFalse = true;
                }
            }


            if (!hasOnceFalse) {
                intercept = mean.getResult();
            } else {
                intercept = regression.getIntercept();

                if (Double.isNaN(intercept)) {
                    intercept = mean.getResult();
                }
            }
        } else if (resultsCount == 1) {
            intercept = results.get(0).getConnections().stream().filter(LearnDictResultConnection::isValue).count();
        }

        int wordsPerStep = Math.max((int) Math.ceil(intercept) + 1, 3);

        return Math.min(data.getData().getDictionary().getEntries().size(), wordsPerStep);

    }

    @Data
    private static class WordLearnProgress {
        public final LearnDataDictEntry entry;
        public final double longAgo;
        public final boolean resultValue;
    }
}
