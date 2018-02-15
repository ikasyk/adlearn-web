package io.adlearn.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "learn_data_dict_entries")
public class LearnDataDictEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dictionary_id")
    @JsonIgnore
    private LearnDataDict dictionary;

    @OneToMany(mappedBy = "entry", cascade = CascadeType.ALL)
    @OrderColumn(name = "unit_order")
    private List<LearnDataDictUnit> units;

}
