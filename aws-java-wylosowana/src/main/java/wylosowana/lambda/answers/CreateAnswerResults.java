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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class CreateAnswerResults implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            TablesMapperAnswers tablesMapperAnswers = new TablesMapperAnswers();
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            TestAnswer answer = tablesMapperAnswers.getUserTestAnswers(body.get("userId").asText(), body.get("testId").asText());
            tablesMapperAnswers.updateTestAnswer(TestAnswerCreator.addRecruiterResult(answer, new ObjectMapper().convertValue( body.get("results"), ArrayList.class)));
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
