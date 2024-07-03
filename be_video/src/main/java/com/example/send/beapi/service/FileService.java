package com.example.send.beapi.service;

import com.example.send.beapi.common.FileModel;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public interface FileService {
    FileModel uploadVideo(String path, MultipartFile file) throws IOException;

    InputStream getResource(String path, String fileName , Long id) throws FileNotFoundException;
}
