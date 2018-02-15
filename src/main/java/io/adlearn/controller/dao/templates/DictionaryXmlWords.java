package io.adlearn.controller.dao.templates;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;

import java.util.List;

@Data
@JacksonXmlRootElement(localName = "words")
public class DictionaryXmlWords {
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<Entry> entry;


    @Data
    @JacksonXmlRootElement(localName = "entry")
    public static class Entry {
        private String word;
        private String translation;
        private Integer entryId;
    }
}
