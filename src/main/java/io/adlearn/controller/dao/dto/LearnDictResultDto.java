package io.adlearn.controller.dao.dto;

import lombok.Data;

import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Data
public class LearnDictResultDto {
    @NotNull
    private Long dataId;

    private Map<Long, Boolean> results;
}
