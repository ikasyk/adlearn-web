package io.adlearn.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class HomeController {
    @RequestMapping({"/", "/learn/{id}", "/sign-up"})
    public String index() {
        return "index";
    }
}
