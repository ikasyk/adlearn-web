package io.adlearn.controller.dao.dto;

import io.adlearn.validator.annotation.PasswordsMatches;
import io.adlearn.validator.annotation.ValidEmail;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@PasswordsMatches
public class UserRegistrationDto {
    @NotNull
    @Size(min = 4)
    private String login;

    @NotNull
    @Size(min = 4)
    @ValidEmail
    private String email;

    @NotNull
    @Size(min = 6)
    private String password;

    @NotNull
    @Size(min = 6)
    private String confirmPassword;
}
