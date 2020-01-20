package com.wylosowana.domain.answers;

import com.amazonaws.util.CollectionUtils;
import com.amazonaws.util.StringUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class Solution {
    private int no;
    private String answer;
    private List<String> answers;

    public Solution(int no, String answer, List<String> answers) {
        this.no = no;
        this.answer = answer;
        this.answers = answers;
    }

    @JsonIgnore
    public boolean isOpen() {
        return !StringUtils.isNullOrEmpty(answer) && CollectionUtils.isNullOrEmpty(answers);
    }

    @JsonIgnore
    public boolean isClosed() {
        return !isOpen();
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
}
