// package com.backend.recipes.models;
// import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
// import com.amazonaws.regions.Regions;
// import com.amazonaws.services.s3.AmazonS3;
// import com.amazonaws.services.s3.AmazonS3ClientBuilder;
// import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
// import com.amazonaws.services.s3.model.ObjectMetadata;
// import com.amazonaws.services.s3.model.PutObjectRequest;
// import io.github.cdimascio.dotenv.Dotenv;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.stereotype.Component;
// import org.springframework.web.multipart.MultipartFile;
// import software.amazon.awssdk.core.sync.RequestBody;
// import software.amazon.awssdk.services.s3.S3Client;
// import software.amazon.awssdk.services.s3.model.PutObjectResponse;
// import software.amazon.awssdk.services.s3.model.S3Exception;

// import java.io.FileInputStream;
// import java.io.IOException;
// import java.io.InputStream;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.UUID;

// @Component
// public class S3Service {
// @Autowired
// private final AmazonS3 s3Client;

// private final String bucketName;

// public S3Service(Dotenv dotenv) {
// String accessKeyId = dotenv.get("AWS_ACCESS_KEY_ID");
// String secretAccessKey = dotenv.get("AWS_SECRET_ACCESS_KEY");

// s3Client = AmazonS3ClientBuilder.standard()
// .withCredentials(new EnvironmentVariableCredentialsProvider())
// .withRegion(Regions.EU_WEST_2)
// .build();

// bucketName = "familyrecipeimages";
// }
// // GeneratePresignedUrlRequest generatePresignedUrlRequest =
// // new GeneratePresignedUrlRequest(bucketName, key);
// public String generateUploadURL() {
// String key = UUID.randomUUID().toString();
// ObjectMetadata metadata = new ObjectMetadata();
// metadata.setContentType("image/jpeg");

// PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key,
// (InputStream) null, metadata);

// s3Client.putObject(putObjectRequest);

// return "";
// }

// public String uploadImage(MultipartFile file) throws IOException {
// String key = UUID.randomUUID().toString();
// ObjectMetadata metadata = new ObjectMetadata();
// metadata.setContentType(file.getContentType());
// metadata.setContentLength(file.getSize());
// PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key,
// file.getInputStream(), metadata);
// s3Client.putObject(putObjectRequest);
// return s3Client.getUrl(bucketName, key).toString();
// }
// //
// // public static String putS3Object(S3Client s3, String bucketName, String
// objectKey, String objectPath) {
// //
// // try {
// // Map<String, String> metadata = new HashMap<>();
// // metadata.put("x-amz-meta-myVal", "test");
// // PutObjectRequest putOb = PutObjectRequest.builder()
// // .bucket(bucketName)
// // .key(objectKey)
// // .metadata(metadata)
// // .build();
// //
// // PutObjectResponse response = s3.putObject(putOb,
// RequestBody.fromBytes(getObjectFile(objectPath)));
// // return response.eTag();
// //
// // } catch (S3Exception e) {
// // System.err.println(e.getMessage());
// // System.exit(1);
// // }
// //
// // return "";
// // }

// // Return a byte array.
// // private static byte[] getObjectFile(String filePath) {
// //
// // FileInputStream fileInputStream = null;
// // byte[] bytesArray = null;
// //
// // try {
// // File file = new File(filePath);
// // bytesArray = new byte[(int) file.length()];
// // fileInputStream = new FileInputStream(file);
// // fileInputStream.read(bytesArray);
// //
// // } catch (IOException e) {
// // e.printStackTrace();
// // } finally {
// // if (fileInputStream != null) {
// // try {
// // fileInputStream.close();
// // } catch (IOException e) {
// // e.printStackTrace();
// // }
// // }
// // }
// //
// // return bytesArray;
// // }

// }

// //return
// s3Client.generatePresignedUrl(generatePresignedUrlRequest).toString();