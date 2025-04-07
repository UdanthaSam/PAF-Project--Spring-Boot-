package Paf.Backend.Paf.Backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class UserModel {
    @Id
    @GeneratedValue
    @JsonProperty("userid")
    private Long id;

    @JsonProperty("fname")
    private String fname;

    @JsonProperty("lname")
    private String lname;

    @JsonProperty("username")
    private String username;

    @JsonProperty("password")
    private String password;

    public UserModel() {}
    public UserModel(Long id, String fname, String lname, String username, String password) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.username = username;
        this.password = password;
    }

    // Getters and setters remain unchanged
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }

    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}