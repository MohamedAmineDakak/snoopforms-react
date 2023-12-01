export const setSubmissionValue = (
  v: any,
  pageName: string,
  name: string,
  setSubmission: (s: any) => void,
  isLikert: Boolean = false
) => {
  console.log('value : ', v);
  console.log('page : ', pageName);
  console.log('name : ', name);
  setSubmission((submission: any) => {
    console.log(submission);
    const newSubmission = { ...submission };
    if (!(pageName in newSubmission)) {
      newSubmission[pageName] = {};
    }
    console.log(isLikert);
    if (isLikert) {
      if (!(name in newSubmission[pageName])) {
        newSubmission[pageName][name] = {};
      }
      newSubmission[pageName][name][v.row] = v.column;
    } else {
      newSubmission[pageName][name] = v;
    }
    return newSubmission;
  });
};

export const getOptionsSchema = (options: any[] | undefined) => {
  const newOptions = [];
  if (options) {
    for (const option of options) {
      if (typeof option === 'string') {
        newOptions.push({ label: option, value: option });
      }
      if (
        typeof option === 'object' &&
        'value' in option &&
        'label' in option
      ) {
        newOptions.push({ label: option.label, value: option.value });
      }
    }
  }
  return newOptions;
};
