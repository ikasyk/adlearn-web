package io.adlearn.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "learn_dict_results")
public class LearnDictResult {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL)
    private List<LearnDictResultConnection> connections;

    @ManyToOne
    @JoinColumn(name = "learn_data_id")
    @JsonIgnore
    private UserLearnData learnData;
}
