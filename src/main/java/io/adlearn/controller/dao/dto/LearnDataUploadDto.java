package io.adlearn.controller.dao.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
public class LearnDataUploadDto {
    @NotNull
    private String type;

    @NotNull
    private String name;

    private MultipartFile file;
}
