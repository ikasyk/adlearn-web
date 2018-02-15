package io.adlearn.controller.api;

import io.adlearn.controller.dao.dto.UserRegistrationDto;
import io.adlearn.controller.dao.response.UserInfo;
import io.adlearn.entity.User;
import io.adlearn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserApiController {
    private UserService service;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserApiController(UserService userService, PasswordEncoder passwordEncoder) {
        service = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping("/users")
    public Collection<User> retrieveAll() {
        UserRegistrationDto u = new UserRegistrationDto();
        u.setLogin("ikasyk");
        u.setEmail("kasyk3@gmail.com");
        u.setPassword("123456");
        registerUser(u);

        return service.getAll();
    }

    @RequestMapping("/registration")
    public ResponseEntity registration(@Valid @RequestBody UserRegistrationDto data, BindingResult result, WebRequest request, Errors errors) {
        if (!result.hasErrors()) {
            registerUser(data);

            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity<List>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/info")
    public ResponseEntity info() {
        String username = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (username.equals("anonymousUser")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } else {
            User user = service.findByLogin(username);

            if (user != null) {

                UserInfo userInfo = new UserInfo(user);

                return new ResponseEntity<>(userInfo, HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
        }
    }

    private void registerUser(UserRegistrationDto data) {
        User registeredUser = new User();
        registeredUser.setEmail(data.getEmail());
        registeredUser.setLogin(data.getLogin());
        registeredUser.setPassword(passwordEncoder.encode(data.getPassword()));

        service.create(registeredUser);
    }

}
