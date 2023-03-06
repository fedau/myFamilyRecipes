package com.backend.recipes.controller;

import java.io.IOException;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    public S3Service() {
        this.s3Client = S3Client.builder()
                .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
                .region(Region.of(region))
                .build();
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();

            byte[] fileContent = file.getBytes();
            SdkBytes sdkBytes = SdkBytes.fromByteArray(fileContent);
            putObjectRequest = putObjectRequest.toBuilder()
                    .contentLength((long) fileContent.length)
                    .build();

            ResponseBytes<PutObjectResponse> responseBytes = s3Client.putObject(putObjectRequest, sdkBytes);
            String objectUrl = s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fileName).build()).toExternalForm();

            return objectUrl;
        } catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            throw new RuntimeException(e);
        }
    }

    public String generatePreSignedUrl(String objectKey) {
        try {
            java.util.Date expiration = new java.util.Date();
            long expTimeMillis = expiration.getTime();
            expTimeMillis += 1000 * 60 * 60; // Add 1 hour.
            expiration.setTime(expTimeMillis);

            return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(objectKey).build(), expiration).toExternalForm();
        } catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            throw new RuntimeException(e);
        }
    }
}
