package io.adlearn.validator;

import io.adlearn.controller.dao.dto.UserRegistrationDto;
import io.adlearn.validator.annotation.PasswordsMatches;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordsMatchValidator implements ConstraintValidator<PasswordsMatches, Object> {
    @Override
    public void initialize(PasswordsMatches annotation) {
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        UserRegistrationDto data = (UserRegistrationDto) o;
        return data.getConfirmPassword().equals(data.getPassword());
    }
}