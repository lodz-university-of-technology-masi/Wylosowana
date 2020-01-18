package com.wylosowana.domain.tests;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Lang {
    private String lang;
    private List<Question> questions;
}
