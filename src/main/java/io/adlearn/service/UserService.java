package io.adlearn.service;

import io.adlearn.entity.User;
import io.adlearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class UserService {
    private UserRepository repo;

    @Autowired
    public UserService(UserRepository repository) {
        this.repo = repository;
    }

    public void create(User user) {
        repo.save(user);
    }

    public void update(User user) {
        repo.save(user);
    }

    public Collection<User> getAll() {
        return repo.findAll();
    }

    public User findByLogin(String username) {
        return repo.findByLogin(username);
    }

}
