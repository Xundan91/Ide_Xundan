
export const defaultCode: Record<number, string> = {
    45: `section .data
  msg db 'Hello Web Ide-Xundan', 0
  section .text
  global _start
  _start:
      mov rax, 1
      mov rdi, 1
      lea rsi, [msg]
      mov rdx, 18
      syscall
      mov rax, 60
      xor rdi, rdi
      syscall`,
    46: `#!/bin/bash
  echo "Hello Web Ide-Xundan"`,
    47: `PRINT "Hello Web Ide-Xundan"`,
    48: `#include <stdio.h>
  int main() {
      printf("Hello Web Ide-Xundan\\n");
      return 0;
  }`,
    52: `#include <iostream>
  int main() {
      std::cout << "Hello Web Ide-Xundan\\n";
      return 0;
  }`,
    51: `using System;
  class Program {
      static void Main(string[] args) {
          Console.WriteLine("Hello Web Ide-Xundan");
      }
  }`,
    54: `#include <iostream>
  int main() {
      std::cout << "Hello Web Ide-Xundan";
      return 0;
  }`,
    60: `package main
  import "fmt"
  func main() {
      fmt.Println("Hello Web Ide-Xundan")
  }`,
    62: `public class Main {
      public static void main(String[] args) {
          System.out.println("Hello Web Ide-Xundan");
      }
  }`,
    63: `console.log("Hello Web Ide-Xundan");`,
    78: `fun main() {
      println("Hello Web Ide-Xundan")
  }`,
    64: `print("Hello Web Ide-Xundan")`,
    79: `#import <Foundation/Foundation.h>
  int main(int argc, const char * argv[]) {
      @autoreleasepool {
          NSLog(@"Hello Web Ide-Xundan");
      }
      return 0;
  }`,
    65: `print_endline "Hello Web Ide-Xundan";;`,
    67: `program HelloWorld;
  begin
      WriteLn('Hello Web Ide-Xundan');
  end.`,
    68: `<?php
  echo "Hello Web Ide-Xundan";
  ?>`,
    71: `print("Hello Web Ide-Xundan")`,
    72: `puts "Hello Web Ide-Xundan"`,
    73: `fn main() {
      println!("Hello Web Ide-Xundan");
  }`,
    81: `object HelloWorld extends App {
      println("Hello Web Ide-Xundan")
  }`,
    82: `SELECT 'Hello Web Ide-Xundan';`,
    83: `import Foundation
  print("Hello Web Ide-Xundan")`,
    74: `console.log("Hello Web Ide-Xundan");`
  };
  