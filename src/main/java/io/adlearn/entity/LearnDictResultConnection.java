package io.adlearn.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "learn_dict_connections")
public class LearnDictResultConnection {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private LearnDictResult result;

    @OneToOne
    @JsonIgnore
    private LearnDataDictEntry entry;

    private boolean value;

    @Override
    public String toString() {
        return "LearnDictResultConnection{" +
                "id=" + id +
                ", entry=" + entry +
                ", value=" + value +
                "}\n";
    }
}
