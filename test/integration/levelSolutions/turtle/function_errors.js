import {TestResults} from '@cdo/apps/constants';

var levelDef = {
  solutionBlocks:
    '<xml><block type="when_run" deletable="false" movable="false"><next><block type="controls_for_counter" inline="true"><mutation counter="counter"></mutation><value name="FROM"><block type="math_number"><title name="NUM">25</title></block></value><value name="TO"><block type="math_number"><title name="NUM">200</title></block></value><value name="BY"><block type="math_number"><title name="NUM">25</title></block></value><statement name="DO"><block type="controls_repeat_ext" inline="true"><value name="TIMES"><block type="math_number"><title name="NUM">3</title></block></value><statement name="DO"><block type="draw_move" inline="true"><title name="DIR">moveForward</title><value name="VALUE"><block type="variables_get"><title name="VAR">counter</title></block></value><next><block type="draw_turn" inline="true"><title name="DIR">turnRight</title><value name="VALUE"><block type="math_number"><title name="NUM">120</title></block></value></block></next></block></statement></block></statement></block></next></block></xml>',
  ideal: Infinity,
  toolbox: null,
  levelBuilderRequiredBlocks:
    '<xml><block type="procedures_defnoreturn" uservisible="false"><mutation><arg name="side length"></arg></mutation><title name="NAME">draw a triangle</title><statement name="STACK"><block type="controls_repeat_ext" inline="true" uservisible="false"><value name="TIMES"><block type="math_number" uservisible="false"><title name="NUM">3</title></block></value><statement name="DO"><block type="draw_move" inline="true" uservisible="false"><title name="DIR">moveForward</title><value name="VALUE"><block type="parameters_get" uservisible="false"><title name="VAR">side length</title></block></value><next><block type="draw_turn" inline="true" uservisible="false"><title name="DIR">turnRight</title><value name="VALUE"><block type="math_number" uservisible="false"><title name="NUM">120</title></block></value></block></next></block></statement></block></statement></block><block type="draw_colour" inline="true"><value name="COLOUR"><block type="colour_picker"><title name="COLOUR">#ff0000</title></block></value></block></xml>',
  freePlay: false,
  useModalFunctionEditor: true
};

module.exports = {
  app: 'turtle',
  levelDefinition: levelDef,
  tests: [
    {
      description: 'Incomplete block inside function',
      expected: {
        result: false,
        testResult: TestResults.INCOMPLETE_BLOCK_IN_FUNCTION
      },
      xml:
        '<xml><block type="procedures_defnoreturn" uservisible="false"><mutation></mutation><title name="NAME">draw a triangle</title><statement name="STACK"><block type="controls_repeat_ext" inline="true" uservisible="false"><value name="TIMES"><block type="math_number" uservisible="false"><title name="NUM">3</title></block></value><statement name="DO"><block type="draw_move" inline="true" uservisible="false"><title name="DIR">moveForward</title><next><block type="draw_turn" inline="true" uservisible="false"><title name="DIR">turnRight</title><value name="VALUE"><block type="math_number" uservisible="false"><title name="NUM">120</title></block></value></block></next></block></statement></block></statement></block><block type="when_run" deletable="false" movable="false"><next><block type="controls_for_counter" inline="true"><mutation counter="counter"></mutation><value name="FROM"><block type="math_number"><title name="NUM">25</title></block></value><value name="TO"><block type="math_number"><title name="NUM">200</title></block></value><value name="BY"><block type="math_number"><title name="NUM">25</title></block></value><statement name="DO"><block type="procedures_callnoreturn"><mutation name="draw a triangle"></mutation></block></statement></block></next></block></xml>'
    },
    {
      description: 'Unused parameter',
      expected: {
        result: false,
        testResult: TestResults.UNUSED_PARAM
      },
      xml:
        '<xml><block type="procedures_defnoreturn" uservisible="false"><mutation><arg name="length"></arg></mutation><title name="NAME">draw a triangle</title><statement name="STACK"><block type="controls_repeat_ext" inline="true" uservisible="false"><value name="TIMES"><block type="math_number" uservisible="false"><title name="NUM">3</title></block></value><statement name="DO"><block type="draw_move" inline="true" uservisible="false"><title name="DIR">moveForward</title><value name="VALUE"><block type="math_number" uservisible="false"><title name="NUM">100</title></block></value><next><block type="draw_turn" inline="true" uservisible="false"><title name="DIR">turnRight</title><value name="VALUE"><block type="math_number" uservisible="false"><title name="NUM">120</title></block></value></block></next></block></statement></block></statement></block><block type="when_run" deletable="false" movable="false"><next><block type="controls_for_counter" inline="true"><mutation counter="counter"></mutation><value name="FROM"><block type="math_number"><title name="NUM">25</title></block></value><value name="TO"><block type="math_number"><title name="NUM">200</title></block></value><value name="BY"><block type="math_number"><title name="NUM">25</title></block></value><statement name="DO"><block type="procedures_callnoreturn" inline="false"><mutation name="draw a triangle"><arg name="length"></arg></mutation></block></statement></block></next></block></xml>'
    },
    {
      description: 'Function called with wrong number of parameters',
      expected: {
        result: false,
        testResult: TestResults.PARAM_INPUT_UNATTACHED
      },
      xml:
        '<xml><block type="procedures_defnoreturn" uservisible="false"><mutation><arg name="length"></arg></mutation><title name="NAME">draw a triangle</title><statement name="STACK"><block type="controls_repeat_ext" inline="true" uservisible="false"><value name="TIMES"><block type="math_number" uservisible="false"><title name="NUM">3</title></block></value><statement name="DO"><block type="draw_move" inline="true" uservisible="false"><title name="DIR">moveForward</title><value name="VALUE"><block type="parameters_get" uservisible="false"><title name="VAR">length</title></block></value><next><block type="draw_turn" inline="true" uservisible="false"><title name="DIR">turnRight</title><value name="VALUE"><block type="math_number" uservisible="false"><title name="NUM">120</title></block></value></block></next></block></statement></block></statement></block><block type="when_run" deletable="false" movable="false"><next><block type="controls_for_counter" inline="true"><mutation counter="counter"></mutation><value name="FROM"><block type="math_number"><title name="NUM">25</title></block></value><value name="TO"><block type="math_number"><title name="NUM">200</title></block></value><value name="BY"><block type="math_number"><title name="NUM">25</title></block></value><statement name="DO"><block type="procedures_callnoreturn" inline="false"><mutation name="draw a triangle"><arg name="length"></arg></mutation></block></statement></block></next></block></xml>'
    },
    {
      description: 'Extra function declared but not used',
      expected: {
        result: true,
        testResult: TestResults.UNUSED_FUNCTION
      },
      xml:
        '<xml><block type="procedures_defnoreturn" uservisible="false"><mutation><arg name="length"></arg></mutation><title name="NAME">draw a triangle</title><statement name="STACK"><block type="controls_repeat_ext" inline="true" uservisible="false"><value name="TIMES"><block type="math_number" uservisible="false"><title name="NUM">3</title></block></value><statement name="DO"><block type="draw_move" inline="true" uservisible="false"><title name="DIR">moveForward</title><value name="VALUE"><block type="parameters_get" uservisible="false"><title name="VAR">length</title></block></value><next><block type="draw_turn" inline="true" uservisible="false"><title name="DIR">turnRight</title><value name="VALUE"><block type="math_number" uservisible="false"><title name="NUM">120</title></block></value></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" uservisible="false" usercreated="true"><mutation></mutation><title name="NAME">do something</title><statement name="STACK"><block type="draw_move" inline="true" uservisible="false"><title name="DIR">moveForward</title><value name="VALUE"><block type="math_number" uservisible="false"><title name="NUM">100</title></block></value></block></statement></block><block type="when_run" deletable="false" movable="false"><next><block type="controls_for_counter" inline="true"><mutation counter="counter"></mutation><value name="FROM"><block type="math_number"><title name="NUM">25</title></block></value><value name="TO"><block type="math_number"><title name="NUM">200</title></block></value><value name="BY"><block type="math_number"><title name="NUM">25</title></block></value><statement name="DO"><block type="procedures_callnoreturn" inline="false"><mutation name="draw a triangle"><arg name="length"></arg></mutation><value name="ARG0"><block type="variables_get"><title name="VAR">counter</title></block></value></block></statement></block></next></block></xml>'
    }
  ]
};
