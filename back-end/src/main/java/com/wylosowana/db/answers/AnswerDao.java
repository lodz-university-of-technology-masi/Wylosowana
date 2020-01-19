package com.wylosowana.db.answers;

import com.wylosowana.db.Dao;
import com.wylosowana.domain.answers.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerDao extends Dao<Answer, String> {
    Optional<Answer> findByTestIdAndLogin(String testId, String login);

    List<Answer> findByTestId(String testId);
}
