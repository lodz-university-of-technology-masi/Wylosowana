package wylosowana.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import wylosowana.mappers.TablesMapperAnswers;
import wylosowana.model.TestAnswers.TestAnswer;
import wylosowana.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class ReadTestToCheck  implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        try {
            List<TestAnswer> answer = new TablesMapperAnswers().getTestUsers(pathParameters.get("testId"));
            return ApiResponseHandler.createResponse(answer, 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
