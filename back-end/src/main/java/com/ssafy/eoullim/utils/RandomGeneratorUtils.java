package com.ssafy.eoullim.utils;

import com.ssafy.eoullim.exception.EoullimApplicationException;
import com.ssafy.eoullim.exception.ErrorCode;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomGeneratorUtils {
    public static List<Integer> generateRandomNumbers(int min, int max, int count) {
        if (max - min + 1 < count) {
            throw new EoullimApplicationException(ErrorCode.INVALID_DATA, "Range is too small to generate requested number of unique random numbers.");
        }
        List<Integer> randomNumbers = new ArrayList<>();
        Random random = new Random();

        while (randomNumbers.size() < count) {
            int randomNumber = random.nextInt(max - min + 1) + min;
            if (!randomNumbers.contains(randomNumber)) {
                randomNumbers.add(randomNumber);
            }
        }
        return randomNumbers;
    }
}