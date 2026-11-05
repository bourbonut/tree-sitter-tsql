module.exports = {
  // https://msdn.microsoft.com/en-us/library/ms188074.aspx
  // Spaces are allowed for comparison operators.
  comparison_operator: _ => choice(
    '=',
    '>',
    '<',
    seq('<', '='),
    seq('>', '='),
    seq('<', '>'),
    seq('!', '='),
    seq('!', '>'),
    seq('!', '<'),
  ),

  assignment_operator: _ => choice(
    '+=',
    '-=',
    '*=',
    '/=',
    '%=',
    '&=',
    '^=',
    '|=',
  ),
}
