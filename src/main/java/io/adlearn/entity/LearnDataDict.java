package io.adlearn.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name="learn_data_dicts")
public class LearnDataDict {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @JsonProperty("size")
    private Long deepSize;

    @OneToMany(mappedBy = "dictionary", cascade = CascadeType.ALL)
    @OrderColumn(name="entry_order")
    private List<LearnDataDictEntry> entries;
}
