package com.wylosowana.handlers.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.domain.answers.Answer;
import com.wylosowana.handlers.HandlerUtils;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.http.HttpStatus;

import java.util.List;

@CommonsLog
public class GetAnswers extends AnswersHandler implements RequestHandler<Void, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Void aVoid, Context context) {
        try {
            List<Answer> answers = answerDao.findAll();

            return HandlerUtils.buildResponse()
                    .setStatusCode(HttpStatus.SC_OK)
                    .setObjectBody(answers)
                    .build();
        } catch (Exception e) {
            log.error("Exception thrown in AnswersHandler::handleRequest! " + e.getMessage());
            return HandlerUtils.buildError().build();
        }
    }
}
