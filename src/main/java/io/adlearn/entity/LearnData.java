package io.adlearn.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "learn_data")
public class LearnData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "data_type")
    private LearnType type;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="data_dictionary")
    private LearnDataDict dictionary;

    @OneToMany(mappedBy = "data", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserLearnData> users;
}
