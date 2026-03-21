import java.awt.*;
import java.util.Arrays;
import javax.swing.*;
import javax.swing.border.LineBorder;


public class Calculator{
    int boardWidth = 360;
    int boardHeight = 540;

    Color customLightGray = new Color(212, 212, 210);
    Color customDarkGray = new Color(80, 80, 80);
    Color customBlack = new Color(0, 0, 0);
    Color customOrange = new Color(255, 149, 0);
    
    //light mode
    Color lightBackground = new Color(245,245,245);
    Color lightButton = new Color(230,230,230);
    Color lightText = new Color(20,20,20);

    boolean darkMode = true;

    String[] buttonValues = 
    {
        "AC", "+/-", "%", "÷",
        "7", "8", "9", "x",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "0", ".", "√", "=",
        "sin", "cos", "tan", "log",
        "ln", "π", "e", "x²", 
        "Mode", "(", ")", "←"
    };

  String[] rightSymbols = { "÷", "x", "-", "+", "=" };
  String[] topSymbols = { "AC","←", "+/-", "%",};

  JFrame frame = new JFrame("Calculator");
  JLabel displayLabel = new JLabel();
  JPanel displayPanel = new JPanel();
  JPanel buttonsPanel = new JPanel();

String expression = "";
String displayText = "";
boolean justEvaluated = false;

  public Calculator() {

        frame.setSize(boardWidth, boardHeight);
        frame.setLocationRelativeTo(null);
        frame.setResizable(false);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());

        displayLabel.setBackground(customBlack);
        displayLabel.setForeground(Color.white);
        displayLabel.setFont(new Font("Arial", Font.PLAIN, 80));
        displayLabel.setHorizontalAlignment(JLabel.RIGHT);
        displayLabel.setText("0");
        displayLabel.setOpaque(true);

        displayPanel.setLayout(new BorderLayout());
        displayPanel.add(displayLabel);
        frame.add(displayPanel, BorderLayout.NORTH);

        buttonsPanel.setLayout(new GridLayout(8, 4));
        frame.add(buttonsPanel);        

        for(String buttonValue : buttonValues) {
            JButton button = new JButton(buttonValue);
            button.setFont(new Font("Arial", Font.PLAIN, 30));
            button.setFocusable(false);
            button.setBorder(new LineBorder(customBlack));

            if (Arrays.asList(topSymbols).contains(buttonValue)) {
                button.setBackground(customLightGray);
                button.setForeground(customBlack);
            }
            else if (Arrays.asList(rightSymbols).contains(buttonValue)) {
                button.setBackground(customOrange);
                button.setForeground(Color.white);
            }
            else {
                button.setBackground(customDarkGray);
                button.setForeground(Color.white);
            }
            buttonsPanel.add(button);
            button.addActionListener(e -> handleButton(buttonValue));
        }

        applyTheme();
        frame.setVisible(true);
    }

  void handleButton(String buttonValue) {

        // parentheses
        if (buttonValue.equals("(") || buttonValue.equals(")")) {
            displayText += buttonValue;
            expression += buttonValue;
            displayLabel.setText(displayText);
            return;
        }
        // numbers
        if ("0123456789".contains(buttonValue)) {
            if (justEvaluated) {
                expression = "";
                displayText = "";
                justEvaluated = false;
            }
            displayText += buttonValue;
            expression += buttonValue;
            displayLabel.setText(displayText);
            return;
        }

        // decimal
        if (buttonValue.equals(".")) {
            if (justEvaluated) {
                expression = "";
                displayText = "";
                justEvaluated = false;
            }
            displayText += ".";
            expression += ".";
            displayLabel.setText(displayText);
            return;
        }

        // percentage
      if (buttonValue.equals("%")) {
                try {
                    if (!expression.isEmpty()) {
                        double val = eval(expression) / 100.0;
                        String s = removeZeroDecimal(val);
                        expression = s;
                        displayText = s;
                        displayLabel.setText(displayText);
                    }
                } catch (Exception ex) {
                    displayLabel.setText(displayText.isEmpty() ? "0" : displayText);
                }
                return;
            }


        // +/- negate
       if (buttonValue.equals("+/-")) {
            try {
                if (!expression.isEmpty()) {
                    double val = Double.parseDouble(expression);
                    val = -val;
                    String s = removeZeroDecimal(val);
                    expression = s;
                    displayText = s;
                    displayLabel.setText(displayText);
                }
            } catch (Exception ex) {}
            return;
        }

        // operators
        if ("÷x-+".contains(buttonValue)) {
            displayText += buttonValue;
            expression += buttonValue;
            displayLabel.setText(displayText);
            return;
        }

        // scientific functions
        if (buttonValue.equals("sin")) {
            displayText += "sin(";
            expression += "S(";
            displayLabel.setText(displayText);
            return;
        }

        if (buttonValue.equals("cos")) {
            displayText += "cos(";
            expression += "C(";
            displayLabel.setText(displayText);
            return;
        }

        if (buttonValue.equals("tan")) {
            displayText += "tan(";
            expression += "T(";
            displayLabel.setText(displayText);
            return;
        }

         if (buttonValue.equals("log")) {
            displayText += "log(";
            expression += "G(";
            displayLabel.setText(displayText);
            return;
        }

        if (buttonValue.equals("ln")) {
            displayText += "ln(";
            expression += "L(";
            displayLabel.setText(displayText);
            return;
        }

        if (buttonValue.equals("√")) {
            displayText += "√(";
            expression += "R(";
            displayLabel.setText(displayText);
            return;
        }


        if (buttonValue.equals("π")) {
            displayText += "π";
            expression += Math.PI;
            displayLabel.setText(displayText);
            return;
        }

        if (buttonValue.equals("e")) {
            displayText += "e";
            expression += Math.E;
            displayLabel.setText(displayText);
            return;
        }

        if (buttonValue.equals("x²")) {
                if (!expression.isEmpty()) {
                    expression += "^2";
                    displayText += "²";
                    displayLabel.setText(displayText);
                }
                return;
            }


        // equals
          if (buttonValue.equals("=")) {
    try {
        // Convert expression into a Java-evaluable form
        String jsExpr = expression;

        // Replace symbols with Java equivalents
        jsExpr = jsExpr.replace("x", "*");
        jsExpr = jsExpr.replace("÷", "/");

        // Convert trig to radians
        jsExpr = jsExpr.replace("Math.sin(", "Math.sin(Math.toRadians(");
        jsExpr = jsExpr.replace("Math.cos(", "Math.cos(Math.toRadians(");
        jsExpr = jsExpr.replace("Math.tan(", "Math.tan(Math.toRadians(");

        // Auto-close parentheses
        int open = jsExpr.length() - jsExpr.replace("(", "").length();
        int close = jsExpr.length() - jsExpr.replace(")", "").length();
        while (close < open) {
            jsExpr += ")";
            close++;
        }

        // Remove trailing operators
        while (jsExpr.endsWith("+") || jsExpr.endsWith("-") ||
               jsExpr.endsWith("*") || jsExpr.endsWith("/")) {
            jsExpr = jsExpr.substring(0, jsExpr.length() - 1);
        }

        if (jsExpr.isEmpty()) {
            displayLabel.setText("0");
            expression = "";
            displayText = "";
            justEvaluated = true;
            return;
        }

        // Evaluate using Java's built-in engine-free evaluator
        double result = eval(jsExpr);

        String s = removeZeroDecimal(result);
        displayLabel.setText(s);
        expression = s;
        displayText = s;
        justEvaluated = true;

    } catch (Exception ex) {
        ex.printStackTrace();
        displayLabel.setText(displayText.isEmpty() ? "0" : displayText);
        justEvaluated = true;
    }
    return;
}

        if (buttonValue.equals("AC")) {
            expression = "";
            displayText = "";
            displayLabel.setText("0");
            return;
        }

        if (buttonValue.equals("Mode")) {
            darkMode = !darkMode;
            applyTheme();
            return;
        }

        if (buttonValue.equals("←")) {
            if (!displayText.isEmpty()) {
                displayText = displayText.substring(0, displayText.length() - 1);
            }
            if (!expression.isEmpty()) {
                expression = smartBackspace(expression);
            }
            displayLabel.setText(displayText.isEmpty() ? "0" : displayText);
            return;
        }
    }
                void applyTheme() {
                if (darkMode) {
                    frame.getContentPane().setBackground(customBlack);
                    displayLabel.setBackground(customBlack);
                    displayLabel.setForeground(Color.white);
                } else {
                    frame.getContentPane().setBackground(lightBackground);
                    displayLabel.setBackground(lightBackground);
                    displayLabel.setForeground(lightText);
                }

                for (Component c : buttonsPanel.getComponents()) {
                    if (c instanceof JButton) {
                        JButton b = (JButton) c;
                        String v = b.getText();

                        if (Arrays.asList(topSymbols).contains(v)) {
                            b.setBackground(darkMode ? customLightGray : lightButton);
                            b.setForeground(darkMode ? customBlack : lightText);
                        } 
                        else if (Arrays.asList(rightSymbols).contains(v)) {
                            b.setBackground(customOrange);
                            b.setForeground(Color.white);
                        } 
                        else {
                            b.setBackground(darkMode ? customDarkGray : lightButton);
                            b.setForeground(darkMode ? Color.white : lightText);
                        }
                    }
                }
                frame.repaint();
            }
                String removeZeroDecimal(double numDisplay){
                    if(numDisplay % 1 == 0)
                        {
                        return Integer.toString((int) numDisplay);
                    }
                    return Double.toString(numDisplay);
                }

                 String squareLastTerm(String expr) {
                         if (expr.isEmpty()){
                            return expr;
                         } 

        String operators = "+-x÷*/(";
        int idx = -1;

        for (int i = expr.length() - 1; i >= 0; i--) {
            if (operators.indexOf(expr.charAt(i)) != -1) {
                idx = i;
                break;
            }
        }

        String before = (idx == -1) ? "" : expr.substring(0, idx + 1);
        String last = (idx == -1) ? expr : expr.substring(idx + 1);

        return before + "Math.pow(" + last + ",2)";
    }

    String smartBackspace(String expr){
        String [] funcs = {"Math.sin(", "Math.cos(", "Math.tan(", "Math.log10(", "Math.log(", "Math.sqrt("};
        for(String f : funcs){
            if(expr.endsWith(f)){
                return expr.substring(0, expr.length() - f.length());
            }
        }
        return expr.substring(0, expr.length() - 1);
    }

   double eval(String expr) {
    return new Object() {
        int pos = -1, ch;

        void nextChar() {
            ch = (++pos < expr.length()) ? expr.charAt(pos) : -1;
        }

        boolean eat(int charToEat) {
            while (ch == ' ') nextChar();
            if (ch == charToEat) {
                nextChar();
                return true;
            }
            return false;
        }

        double parse() {
            nextChar();
            double x = parseExpression();
            if (pos < expr.length()) throw new RuntimeException("Unexpected: " + (char) ch);
            return x;
        }

        double parseExpression() {
            double x = parseTerm();
            for (;;) {
                if      (eat('+')) x += parseTerm();
                else if (eat('-')) x -= parseTerm();
                else return x;
            }
        }

        double parseTerm() {
            double x = parseFactor();
            for (;;) {
                if      (eat('*')) x *= parseFactor();
                else if (eat('/')) x /= parseFactor();
                else return x;
            }
        }

        double parseFactor() {

            // scientific functions
if (eat('S')) { eat('('); double v = parseExpression(); eat(')'); return Math.sin(Math.toRadians(v)); }
if (eat('C')) { eat('('); double v = parseExpression(); eat(')'); return Math.cos(Math.toRadians(v)); }
if (eat('T')) { eat('('); double v = parseExpression(); eat(')'); return Math.tan(Math.toRadians(v)); }
if (eat('R')) { eat('('); double v = parseExpression(); eat(')'); return Math.sqrt(v); }
if (eat('G')) { eat('('); double v = parseExpression(); eat(')'); return Math.log10(v); }
if (eat('L')) { eat('('); double v = parseExpression(); eat(')'); return Math.log(v); }


            if (eat('+')) return parseFactor();
            if (eat('-')) return -parseFactor();

            double x;
            int startPos = this.pos;

            if (eat('(')) {
                x = parseExpression();
                eat(')');
            } else if ((ch >= '0' && ch <= '9') || ch == '.') {
                while ((ch >= '0' && ch <= '9') || ch == '.') nextChar();
                x = Double.parseDouble(expr.substring(startPos, this.pos));
            } else {
                throw new RuntimeException("Unexpected: " + (char) ch);
            }

            if (eat('^')) x = Math.pow(x, parseFactor());

            return x;
        }
    }.parse();
}

  

    public static void main(String[] args) {
        new Calculator();
    }
}
