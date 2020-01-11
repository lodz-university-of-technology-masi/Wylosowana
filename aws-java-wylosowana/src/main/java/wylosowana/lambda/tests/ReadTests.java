package wylosowana.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import wylosowana.mappers.TablesMapperTest;
import wylosowana.model.Test.Test;
import wylosowana.responses.ApiResponseHandler;

import java.util.List;
import java.util.Map;

public class ReadTests implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final Logger logger = LogManager.getLogger(this.getClass());
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            List<Test> tests= new TablesMapperTest().getAllTests();
            return ApiResponseHandler.createResponse(tests, 200);
        } catch (Exception  e) {
            logger.error("Error in saving product: " + e);
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}