package com.wylosowana.domain.answers;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Solution {
    private int no;
    private String answer;
    private List<String> answers;
}
