package com.backend.recipes.controller;

import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.recipes.services.GetObjectPresignedUrl;

import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.tools.JavaFileObject;

import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

@RestController
public class ImageController {

    // @Autowired
    // ImageRepository imageRepo;

    // @GetMapping(value = "/images")
    // public ResponseEntity<List<Image>> getAllImages() {
    // return new ResponseEntity<>(imageRepo.findAll(), HttpStatus.OK);
    // }

    // @GetMapping(value = "/images/{id}")
    // public ResponseEntity getImage(@PathVariable Long id) {
    // return new ResponseEntity<>(imageRepo.findById(id), HttpStatus.OK);
    // }

    @PostMapping(value = "/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postImage(@RequestBody MultipartFile image) throws IOException {
        String key = UUID.randomUUID().toString();

        if (image != null && image.getBytes() != null) {
            key = new Date().getTime() + "_" + image.getOriginalFilename();

            // Create an S3Client object with your AWS credentials and the desired AWS
            // Region
            ProfileCredentialsProvider credentialsProvider = ProfileCredentialsProvider.create();
            Region region = Region.EU_CENTRAL_1;
            S3Client s3 = S3Client.builder()
                    .region(region)
                    .credentialsProvider(credentialsProvider)
                    .build();

            // Create a PutObjectRequest object with the bucket name, object key, and
            // metadata
            Map<String, String> metadata = new HashMap<>();
            metadata.put("x-amz-meta-myVal", "test");
            PutObjectRequest putOb = PutObjectRequest.builder()
                    .bucket("file-test-bucket-ilger")
                    .key(key)
                    .metadata(metadata)
                    .build();

            // Upload the image file to S3 using the PutObjectRequest object and the image's
            // byte array

            PutObjectResponse response = s3.putObject(putOb, software.amazon.awssdk.core.sync.RequestBody
                    .fromInputStream(image.getInputStream(), image.getSize()));

            S3Presigner presigner = S3Presigner.builder()
                    .region(region)
                    .credentialsProvider(credentialsProvider)
                    .build();

            String preSignedUrl = GetObjectPresignedUrl.getPresignedUrl(presigner, "file-test-bucket-ilger", key);

            presigner.close();
            // Close the S3Client
            s3.close();
            // String content = new
            // StringBuilder().append("{\"imageUrl\":\"").append(preSignedUrl).append("\"}")
            // .toString();
            // return new ResponseEntity<>(content, HttpStatus.CREATED);
            // return new ResponseEntity<>(preSignedUrl, HttpStatus.CREATED);
            return ResponseEntity.status(HttpStatus.CREATED).body(preSignedUrl);
        }
        return new ResponseEntity<>("Failed to upload image, image null", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
