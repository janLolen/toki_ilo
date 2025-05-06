**Supported Snippets**
* `.program`
```    
    _PRINTF = 127
    _GETCHAR = 117
    _EXIT = 1

    .SECT .TEXT
    main:		!Inizio programma
      
    PUSH 0
    PUSH _EXIT
    SYS		!Fine programma

    .SECT .DATA
      
    .SECT .BSS
      
    !Ricordati di lasciare l'ultima riga o si bugga il compilatore
```    

* `fun:`
```    
    fun:
    PUSH BP
    MOV BP, SP
    
    MOV SP, BP
    POP BP
    RET
```    

* `.input`:
```    
    PUSH _INPUT
    SYS
    SUBB AL, 0x30 !conversione
    MOVB (VARIABILE), AL
    PUSH _INPUT
    SYS !Andata a capo
```    
