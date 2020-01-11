package wylosowana.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import wylosowana.mappers.TablesMapperAnswers;
import wylosowana.model.TestAnswer;
import wylosowana.responses.ApiResponseHandler;

import java.util.List;
import java.util.Map;

public class ReadAnswers implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> stringObjectMap, Context context) {

        try {
            List<TestAnswer> tests= new TablesMapperAnswers().getAllTestAnswers();
            return ApiResponseHandler.createResponse(tests, 200);
        } catch (Exception  e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
