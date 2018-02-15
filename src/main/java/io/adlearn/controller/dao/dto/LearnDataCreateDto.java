package io.adlearn.controller.dao.dto;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.List;

@Data
public class LearnDataCreateDto {
    @NotNull
    private String type;

    @NotNull
    @Min(2)
    private Long size;

    private List<List<String>> data;

    @NotNull
    private String name;
}
