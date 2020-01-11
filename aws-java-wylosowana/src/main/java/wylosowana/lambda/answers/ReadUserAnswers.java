package wylosowana.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import wylosowana.mappers.TablesMapperAnswers;
import wylosowana.model.TestAnswer;
import wylosowana.responses.ApiResponseHandler;

import java.util.List;
import java.util.Map;

public class ReadUserAnswers implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");

        try {
            List<String> answers= new TablesMapperAnswers().getUserTestAnswers(pathParameters.get("userId"), pathParameters.get("testId")).getAnswers();
            if(answers == null)
                return ApiResponseHandler.createResponse("nothing was found.", 200);
            return ApiResponseHandler.createResponse(answers, 200);
        } catch (Exception  e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
