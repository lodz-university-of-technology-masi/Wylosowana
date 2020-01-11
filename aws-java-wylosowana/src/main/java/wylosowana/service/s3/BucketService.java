package wylosowana.service.s3;

import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import wylosowana.identificators.IdentyficatorsController;

import java.io.File;

public class BucketService {
    private AmazonS3 s3Client;

    public BucketService(){
        AmazonS3 s3Client =  AmazonS3ClientBuilder
                .standard()
                .withRegion(IdentyficatorsController.REGION)
                .withCredentials(new EnvironmentVariableCredentialsProvider())
                .build();
    }


    public void uploadFile(File file){
        PutObjectRequest putObjectRequest = new PutObjectRequest(IdentyficatorsController.BUCKET_NAME,
                                                                file.getName(),
                                                                file);
        PutObjectResult putObjectResult = s3Client.putObject(putObjectRequest);
    }
}
