package io.adlearn.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
@Table(name = "user_learn_data")
public class UserLearnData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
//    @PrimaryKeyJoinColumn(name="data_id", referencedColumnName = "id")
    private LearnData data;

    @ManyToOne(cascade = CascadeType.ALL)
//    @PrimaryKeyJoinColumn(name="user_id", referencedColumnName = "id")
    @JsonIgnore
    private User user;

    @NotNull
    private String name;

    @OneToMany(mappedBy = "learnData", cascade = CascadeType.ALL)
    @OrderColumn(name = "result_order")
    @JsonIgnore
    private List<LearnDictResult> results;
}
