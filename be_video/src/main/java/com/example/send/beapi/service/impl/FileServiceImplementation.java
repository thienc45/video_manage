package com.example.send.beapi.service.impl;

import com.example.send.beapi.common.FileModel;
import com.example.send.beapi.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;
@Service
public class FileServiceImplementation implements FileService {
    @Override
    public FileModel uploadVideo(String path, MultipartFile file) throws IOException {
       FileModel fileModel = new FileModel();
       String fileName = file.getOriginalFilename();
       //trying to generate random and uniques
        String randomId = UUID.randomUUID().toString();
        String finalName = randomId.concat(fileName).substring(fileName.indexOf("."));

        //file full path
        String filePath = path+ File.separator + finalName;

        //creating directory to save file
        File f = new File(path);
        if(f.exists()){
            f.mkdir();
        }

        Files.copy(file.getInputStream(), Paths.get(filePath));
        fileModel.setVideoFileName(finalName);
        return fileModel;
    }

    @Override
    public InputStream getResource(String path, String fileName, Long id) throws FileNotFoundException {
        String fullPath = path + File.separator + fileName;
        InputStream inputStream = new FileInputStream(fullPath);

        return inputStream;
    }
}
