package wylosowana.OwnLambda.Answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import wylosowana.mappers.TablesMapperAnswers;
import wylosowana.model.TestAnswers.TestAnswer;
import wylosowana.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.Map;

public class CreateAnswer implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    //postAnswers
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapperAnswers tablesMapperAnswers = new TablesMapperAnswers();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode body = objectMapper.convertValue(input, JsonNode.class);
            TestAnswer testAnswer = objectMapper.treeToValue(body, TestAnswer.class);

            tablesMapperAnswers.saveTestAnswer(testAnswer);

            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}
