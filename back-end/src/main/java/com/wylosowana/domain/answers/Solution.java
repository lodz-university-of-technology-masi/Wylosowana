package com.wylosowana.domain.answers;

import com.amazonaws.util.StringUtils;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Solution {
    private int no;
    private String answer;
    private List<String> answers;

    public boolean isOpen() {
        return !StringUtils.isNullOrEmpty(answer) && answers.isEmpty();
    }

    public boolean isClosed() {
        return !isOpen();
    }
}
