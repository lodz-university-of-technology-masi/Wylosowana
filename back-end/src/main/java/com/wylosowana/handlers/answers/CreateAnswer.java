package com.wylosowana.handlers.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.domain.answers.Answer;
import com.wylosowana.handlers.HandlerUtils;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.http.HttpStatus;

import java.util.Map;
import java.util.Optional;

@CommonsLog
public class CreateAnswer extends AnswersHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            Optional<Answer> answer = getAnswer(input).filter(this::isValid).map(answerDao::save).map(Optional::get);

            return HandlerUtils.buildResponse()
                    .setStatusCode(answer.isPresent() ? HttpStatus.SC_CREATED : HttpStatus.SC_BAD_REQUEST)
                    .setObjectBody(answer.orElse(null))
                    .build();

        } catch (Exception e) {
            log.error("Exception thrown in CreateAnswer::handleRequest!\n" + e.getMessage());

            return HandlerUtils.buildResponse().setObjectBody(e.getMessage()).setStatusCode(HttpStatus.SC_BAD_REQUEST).build();
        }
    }
}
