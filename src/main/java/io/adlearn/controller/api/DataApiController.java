package io.adlearn.controller.api;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import io.adlearn.adaptive.AdaptiveUtils;
import io.adlearn.controller.dao.dto.LearnDataCreateDto;
import io.adlearn.controller.dao.dto.LearnDictResultDto;
import io.adlearn.controller.dao.templates.DictionaryXmlWords;
import io.adlearn.entity.*;
import io.adlearn.service.DataService;
import io.adlearn.service.LearnTypeService;
import io.adlearn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/data")
public class DataApiController {
    private DataService service;

    private UserService userService;

    private LearnTypeService learnTypeService;

    @Autowired
    public DataApiController(DataService serivce, UserService userService, LearnTypeService learnTypeService) {
        this.service = serivce;
        this.userService = userService;
        this.learnTypeService = learnTypeService;
    }

    @RequestMapping("/def")
    public Collection<UserLearnData> addSmth() {
        LearnData learnData = new LearnData();

        LearnDataDict learnDataDict = new LearnDataDict();
        learnDataDict.setDeepSize(2L);

        LearnDataDictEntry e1 = new LearnDataDictEntry();

        LearnDataDictUnit u11 = new LearnDataDictUnit();
        u11.setContent("Elephant");

        LearnDataDictUnit u12 = new LearnDataDictUnit();
        u12.setContent("Слон");

        e1.setUnits(new ArrayList<>(Arrays.asList(u11, u12)));


        LearnDataDictEntry e2 = new LearnDataDictEntry();

        LearnDataDictUnit u21 = new LearnDataDictUnit();
        u21.setContent("Bear");

        LearnDataDictUnit u22 = new LearnDataDictUnit();
        u22.setContent("Медведь");

        e2.setUnits(new ArrayList<>(Arrays.asList(u21, u22)));


        LearnDataDictEntry e3 = new LearnDataDictEntry();

        LearnDataDictUnit u31 = new LearnDataDictUnit();
        u31.setContent("Elephant");

        LearnDataDictUnit u32 = new LearnDataDictUnit();
        u32.setContent("Слон");

        e3.setUnits(new ArrayList<>(Arrays.asList(u31, u32)));


        learnDataDict.setEntries(new ArrayList<>(Arrays.asList(e1, e2, e3)));

        learnData.setDictionary(learnDataDict);

        LearnType type = new LearnType();
        type.setPackageName("dictionary");

        learnData.setType(type);

        UserLearnData userLearnData = new UserLearnData();
        userLearnData.setData(learnData);

        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByLogin(username);

        user.setLearnData(Collections.singletonList(userLearnData));

        service.create(userLearnData);

        return service.getAll();
    }

    @PutMapping("/assign/{dataId}")
    public void assign(@PathVariable Long dataId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserLearnData userLearnData = new UserLearnData();

        LearnData learnData = service.findDataById(dataId);

        User user = userService.findByLogin(username);

        userLearnData.setUser(user);
        userLearnData.setData(learnData);

        service.create(userLearnData);
    }

    @PostMapping("")
    public List<UserLearnData> retrieveAll() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.findByLogin(username);

        return user.getLearnData();
    }

    @PostMapping("/{dataId}")
    public UserLearnData getOne(@PathVariable("dataId") Long dataId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.findByLogin(username);

        Long userId = user.getId();

        UserLearnData result = service.findByUserIdAndDataId(userId, dataId);

        AdaptiveUtils.adaptDictionary(result);

        return result;
    }

    @PutMapping("/create")
    public void create(@Valid @RequestBody LearnDataCreateDto transferData) {
        if (transferData.getType().equals("dictionary")) {
            addDictionary(transferData);
        }

    }

    @PutMapping("/upload")
    public void create(@RequestParam MultipartFile file, @RequestParam String type, @RequestParam String name) throws IOException {
        XmlMapper xmlMapper = new XmlMapper();
        DictionaryXmlWords data = xmlMapper.readValue(file.getInputStream(), DictionaryXmlWords.class);

        LearnDataCreateDto dto = new LearnDataCreateDto();
        List<List<String>> dataList = new ArrayList<>();

        for (DictionaryXmlWords.Entry entry : data.getEntry()) {
            List<String> entryList = new ArrayList<>();
            entryList.add(entry.getWord());
            entryList.add(entry.getTranslation());
            dataList.add(entryList);
        }

        dto.setData(dataList);
        dto.setName(name);
        dto.setType(type);
        dto.setSize(2L);

        if (type.equals("dictionary")) {
            addDictionary(dto);
        }
    }

    @PutMapping("/results")
    public void saveResult(@Valid @RequestBody LearnDictResultDto transferData) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.findByLogin(username);

        UserLearnData userLearnData = service.findByUserIdAndDataId(user.getId(), transferData.getDataId());

        LearnDictResult result = new LearnDictResult();

        List<LearnDictResultConnection> connections = new ArrayList<>();

        Set<Long> entryIds = transferData.getResults().keySet();

        Map<Long, LearnDataDictEntry> entries = service.findEntriesByIds(entryIds);

        for (Map.Entry<Long, Boolean> pair : transferData.getResults().entrySet()) {
            LearnDictResultConnection connection = new LearnDictResultConnection();
            connection.setEntry(entries.get(pair.getKey()));
            connection.setValue(pair.getValue());
            connection.setResult(result);
            connections.add(connection);
        }

        result.setConnections(connections);
        result.setLearnData(userLearnData);
//        System.out.println(userLearnData);
//        System.out.println(userLearnData.getResults());

        userLearnData.getResults().add(result);

        service.create(userLearnData);

//        service.saveResults(result);
    }

    private void addDictionary(LearnDataCreateDto transferData) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.findByLogin(username);

        UserLearnData userLearnData = new UserLearnData();

        LearnData learnData = new LearnData();

        LearnDataDict learnDataDict = new LearnDataDict();

        List<LearnDataDictEntry> entries = new ArrayList<>();

        for (List<String> tEntry : transferData.getData()) {
            LearnDataDictEntry learnDataDictEntry = new LearnDataDictEntry();

            List<LearnDataDictUnit> units = new ArrayList<>();

            for (String unitContent : tEntry) {
                LearnDataDictUnit learnDataDictUnit = new LearnDataDictUnit();
                learnDataDictUnit.setContent(unitContent);
//                Added:
                learnDataDictUnit.setEntry(learnDataDictEntry);

                units.add(learnDataDictUnit);
            }
            learnDataDictEntry.setUnits(units);

//            Added:
            learnDataDictEntry.setDictionary(learnDataDict);

            entries.add(learnDataDictEntry);
        }

        learnDataDict.setEntries(entries);
        learnDataDict.setDeepSize(transferData.getSize());

        learnData.setDictionary(learnDataDict);
        learnData.setType(learnTypeService.findByType(transferData.getType()));

        userLearnData.setData(learnData);
        userLearnData.setUser(user);
        userLearnData.setName(transferData.getName());

//        user.getLearnData().add(userLearnData);

        service.create(userLearnData);

//        userService.create(user);
    }
}
