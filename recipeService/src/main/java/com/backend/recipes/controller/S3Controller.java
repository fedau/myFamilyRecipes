package com.backend.recipes.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.backend.recipes.models.Instructions;
import com.backend.recipes.models.S3Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@RestController
public class S3Controller {
    private final S3Service s3Service;

    public S3Controller(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    private AmazonS3 s3Client;
    private final String bucketName = "familyreciepimages";

    // constructor injection for s3Client

    @PutMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String key = UUID.randomUUID().toString();

        // Set metadata for the uploaded file
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());

        // Set input stream for the uploaded file
        InputStream inputStream = file.getInputStream();

        // Upload the file to S3 bucket
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, inputStream, metadata);
        s3Client.putObject(putObjectRequest);

        // Get the URL of the uploaded file
        String url = s3Client.getUrl(bucketName, key).toString();

        return url;
    }

    @GetMapping("/s3Url")
    public String generateS3Url() {
        return s3Service.generateUploadURL();
    }
//    @PostMapping("/upload")
//    public ResponseEntity<String> generateUploadURL(@RequestParam("fileContent") MultipartFile file) throws IOException {
//        String url = s3Service.generateUploadURL();
//        return new ResponseEntity<>(url, HttpStatus.OK);
//    }


}

