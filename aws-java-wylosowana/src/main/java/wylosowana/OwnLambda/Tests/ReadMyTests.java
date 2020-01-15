package wylosowana.OwnLambda.Tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import wylosowana.mappers.TablesMapperTest;
import wylosowana.model.Test.Test;
import wylosowana.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class ReadMyTests implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final Logger logger = LogManager.getLogger(this.getClass());

        // getTestsForCandidate
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
            List<Test> tests = new TablesMapperTest().getUserTest(pathParameters.get("login"));
            return ApiResponseHandler.createResponse(tests, 200);
        } catch (IOException e) {
            logger.error("Error in getting Answers: " + e);
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
