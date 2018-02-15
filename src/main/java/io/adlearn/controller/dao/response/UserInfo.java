package io.adlearn.controller.dao.response;

import io.adlearn.entity.User;
import lombok.Data;

@Data
public class UserInfo {
    private final String username;
    private final String email;

    public UserInfo(User user) {
        this.username = user.getLogin();
        this.email = user.getEmail();
    }
}
