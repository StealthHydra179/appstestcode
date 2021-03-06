import {expect} from '../../../util/reconfiguredChai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import ProgressTableLevelBubble, {
  unitTestExports
} from '@cdo/apps/templates/sectionProgress/progressTables/ProgressTableLevelBubble';
import color from '@cdo/apps/util/color';
import FontAwesome from '@cdo/apps/templates/FontAwesome';
import {LevelStatus, LevelKind} from '@cdo/apps/util/sharedConstants';
import i18n from '@cdo/locale';

const TITLE = '1';

const defaultProps = {
  levelStatus: LevelStatus.not_tried,
  levelKind: LevelKind.level,
  disabled: false,
  title: TITLE,
  url: '/foo/bar'
};

const borderColors = {
  [LevelStatus.locked]: color.lighter_gray,
  [LevelStatus.not_tried]: color.lighter_gray,
  [LevelStatus.attempted]: color.level_perfect,
  [LevelStatus.passed]: color.level_perfect,
  [LevelStatus.perfect]: color.level_perfect
};
const backgroundColors = {
  [LevelStatus.locked]: color.level_not_tried,
  [LevelStatus.not_tried]: color.level_not_tried,
  [LevelStatus.attempted]: color.level_not_tried,
  [LevelStatus.passed]: color.level_passed,
  [LevelStatus.perfect]: color.level_perfect
};
const assessmentBorders = {
  [LevelStatus.locked]: color.lighter_gray,
  [LevelStatus.not_tried]: color.lighter_gray,
  [LevelStatus.attempted]: color.level_submitted,
  [LevelStatus.submitted]: color.level_submitted,
  [LevelStatus.completed_assessment]: color.level_submitted,
  [LevelStatus.perfect]: color.level_submitted
};
const assessmentBackgrounds = {
  [LevelStatus.locked]: color.level_not_tried,
  [LevelStatus.not_tried]: color.level_not_tried,
  [LevelStatus.attempted]: color.level_not_tried,
  [LevelStatus.submitted]: color.level_submitted,
  [LevelStatus.completed_assessment]: color.level_submitted,
  [LevelStatus.perfect]: color.level_submitted
};

/**
 * Helper function to retrieve the style object of a rendered bubble with the
 * provided status and prpos.
 */
function bubbleContainerStyleForStatus(status, propOverrides = {}) {
  const wrapper = mount(
    <ProgressTableLevelBubble
      {...defaultProps}
      {...propOverrides}
      levelStatus={status}
    />
  );
  const bubbleType = propOverrides.concept
    ? unitTestExports.LargeDiamond
    : unitTestExports.LargeCircle;
  return wrapper
    .find(bubbleType)
    .at(0)
    .childAt(0)
    .props().style;
}

describe('ProgressTableLevelBubble', () => {
  it('renders a link when enabled', () => {
    const wrapper = shallow(<ProgressTableLevelBubble {...defaultProps} />);
    expect(wrapper.find(unitTestExports.LinkWrapper)).to.have.lengthOf(1);
  });

  it('does not render a link when disabled', () => {
    const wrapper = shallow(
      <ProgressTableLevelBubble {...defaultProps} disabled={true} />
    );
    expect(wrapper.find(unitTestExports.LinkWrapper)).to.have.lengthOf(0);
  });

  it('shows correct text in unplugged bubble', () => {
    const wrapper = mount(
      <ProgressTableLevelBubble {...defaultProps} unplugged={true} />
    );
    expect(wrapper.find(unitTestExports.UnpluggedBubble)).to.have.lengthOf(1);
    expect(wrapper.find(unitTestExports.Content).text()).to.equal(
      i18n.unpluggedActivity()
    );
  });

  it('shows title in normal bubble', () => {
    const wrapper = mount(<ProgressTableLevelBubble {...defaultProps} />);
    expect(wrapper.find(unitTestExports.LargeCircle)).to.have.lengthOf(1);
    expect(wrapper.find(unitTestExports.Content).text()).to.equal(TITLE);
  });

  it('shows title in concept bubble', () => {
    const wrapper = mount(
      <ProgressTableLevelBubble {...defaultProps} concept={true} />
    );
    expect(wrapper.find(unitTestExports.LargeDiamond)).to.have.lengthOf(1);
    expect(wrapper.find(unitTestExports.Content).text()).to.equal(TITLE);
  });

  it('shows title in small bubble', () => {
    const wrapper = mount(
      <ProgressTableLevelBubble {...defaultProps} smallBubble={true} />
    );
    expect(wrapper.find(unitTestExports.SmallCircle)).to.have.lengthOf(1);
    expect(wrapper.find(unitTestExports.Content).text()).to.equal(TITLE);
  });

  it('shows correct icon when locked', () => {
    const wrapper = mount(
      <ProgressTableLevelBubble
        {...defaultProps}
        levelStatus={LevelStatus.locked}
      />
    );
    const icon = wrapper.find(FontAwesome);
    expect(icon).to.have.lengthOf(1);
    expect(icon.at(0).props().icon).to.equal('lock');
  });

  it('shows correct icon for bonus', () => {
    const wrapper = mount(
      <ProgressTableLevelBubble {...defaultProps} bonus={true} />
    );
    const icon = wrapper.find(FontAwesome);
    expect(icon).to.have.lengthOf(1);
    expect(icon.at(0).props().icon).to.equal('flag-checkered');
  });

  it('shows correct icon for paired', () => {
    const wrapper = mount(
      <ProgressTableLevelBubble {...defaultProps} paired={true} />
    );
    const icon = wrapper.find(FontAwesome);
    expect(icon).to.have.lengthOf(1);
    expect(icon.at(0).props().icon).to.equal('users');
  });

  it('only shows paired icon for bonus + paired', () => {
    const wrapper = mount(
      <ProgressTableLevelBubble {...defaultProps} bonus={true} paired={true} />
    );
    const icon = wrapper.find(FontAwesome);
    expect(icon).to.have.lengthOf(1);
    expect(icon.at(0).props().icon).to.equal('users');
  });

  it('renders a diamond for concept levels', () => {
    const style = bubbleContainerStyleForStatus(LevelStatus.not_tried, {
      concept: true
    });
    expect(style.transform).to.equal('rotate(45deg)');
  });

  Object.keys(borderColors).forEach(status => {
    it(`shows correct border color for status ${status} - not assessment`, () => {
      const style = bubbleContainerStyleForStatus(status);
      expect(style.borderColor).to.equal(borderColors[status]);
    });
  });

  Object.keys(backgroundColors).forEach(status => {
    it(`shows correct background color for status ${status} - not assessment`, () => {
      const style = bubbleContainerStyleForStatus(status);
      expect(style.backgroundColor).to.equal(backgroundColors[status]);
    });
  });

  Object.keys(assessmentBorders).forEach(status => {
    it(`shows correct border color for status ${status} - assessment`, () => {
      const style = bubbleContainerStyleForStatus(status, {
        levelKind: LevelKind.assessment
      });
      expect(style.borderColor).to.equal(assessmentBorders[status]);
    });
  });

  Object.keys(assessmentBackgrounds).forEach(status => {
    it(`shows correct background color for status ${status} - assessment`, () => {
      const style = bubbleContainerStyleForStatus(status, {
        levelKind: LevelKind.assessment
      });
      expect(style.backgroundColor).to.equal(assessmentBackgrounds[status]);
    });
  });
});
