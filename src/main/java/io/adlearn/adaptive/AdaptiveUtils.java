package io.adlearn.adaptive;

import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import io.adlearn.entity.LearnDictResult;
import io.adlearn.entity.UserLearnData;
import org.apache.commons.math3.stat.descriptive.moment.Mean;
import org.apache.commons.math3.stat.regression.SimpleRegression;

import java.util.List;

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
     * @param data initial dictionary data.
     */
    public static void adaptDictionary(UserLearnData data) {
        List<LearnDictResult> results = data.getResults();

        int resultsCount = results.size();

        double intercept = WORDS_PER_STEP;

        if (resultsCount > 0) {
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

            if (hasOnceFalse) {
                intercept = mean.getResult();
            } else {
                intercept = regression.getIntercept();
            }
        }
        int wordsPerStep = Math.max((int)Math.ceil(intercept) + 1, 3);

        int resCount = Math.min(data.getData().getDictionary().getEntries().size(), wordsPerStep);

        data.getData().getDictionary().setEntries(data.getData().getDictionary().getEntries().subList(0, resCount));

    }
}
