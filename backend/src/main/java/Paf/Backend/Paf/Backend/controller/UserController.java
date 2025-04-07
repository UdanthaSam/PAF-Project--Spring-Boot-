package Paf.Backend.Paf.Backend.controller;

import Paf.Backend.Paf.Backend.exception.UserNotFoundException;
import Paf.Backend.Paf.Backend.model.UserModel;
import Paf.Backend.Paf.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    // Insert
    @PostMapping("/user")
    public ResponseEntity<UserModel> newUserModel(@RequestBody UserModel newUserModel) {
        System.out.println("Received user: " + newUserModel);
        UserModel savedUser = userRepository.save(newUserModel);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Get
    @GetMapping("/user")
    List<UserModel> getAllItems() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    UserModel getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // Update
    @PutMapping("/user/{id}")
    public ResponseEntity<UserModel> updateUser(@PathVariable Long id, @RequestBody UserModel updatedUser) {
        UserModel existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        // Update fields
        existingUser.setFname(updatedUser.getFname());
        existingUser.setLname(updatedUser.getLname());
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(updatedUser.getPassword());

        UserModel savedUser = userRepository.save(existingUser);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    // Delete by ID
    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return new ResponseEntity<>("User with ID " + id + " has been deleted", HttpStatus.OK);
    }

    // Delete all
    @DeleteMapping("/user")
    public ResponseEntity<String> deleteAllUsers() {
        long count = userRepository.count();
        userRepository.deleteAll();
        return new ResponseEntity<>("Deleted " + count + " users", HttpStatus.OK);
    }
}