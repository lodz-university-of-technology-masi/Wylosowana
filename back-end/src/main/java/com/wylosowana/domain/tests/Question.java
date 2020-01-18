package com.wylosowana.domain.tests;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Question {
    private int no;
    private String question;
    private List<String> answers;
    private List<String> correct;
}
