package wylosowana.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import wylosowana.creators.TestAnswerCreator;
import wylosowana.mappers.TablesMapperAnswers;
import wylosowana.model.TestAnswer;
import wylosowana.responses.ApiResponseHandler;
import wylosowana.validator.AnswerValidator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class CreateAnswer implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private ObjectMapper mapper = new ObjectMapper();
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            TablesMapperAnswers tablesMapperAnswers = new TablesMapperAnswers();
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            String message = AnswerValidator.checkExistenceSingle(body);
            if(!message.equals(""))
                return ApiResponseHandler.createResponse(message, 404);
            TestAnswer answer = tablesMapperAnswers.getUserTestAnswers(body.get("userId").asText(), body.get("testId").asText());
            tablesMapperAnswers.updateTestAnswer(TestAnswerCreator.addUserAnswer(answer, new ObjectMapper().convertValue( body.get("answers"), ArrayList.class)));
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}
