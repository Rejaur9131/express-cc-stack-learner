const Poll = require('./Poll');

exports.createPollGetConroller = (req, res, next) => {
  res.render('create');
};

exports.createPollPostConroller = async (req, res) => {
  let { title, description, options } = req.body;

  options = options.map((opt) => {
    return {
      name: opt,
      vote: 0,
    };
  });

  let poll = new Poll({
    title,
    description,
    options,
  });

  try {
    await poll.save();
    res.redirect('./polls');
  } catch (error) {
    console.log(error);
  }
};

exports.getAllPolls = async (req, res, next) => {
  try {
    let polls = await Poll.find();
    res.render('polls', { polls });
  } catch (error) {
    console.log(error);
  }
};

exports.viewPollGetController = async (req, res, next) => {
  let id = req.params.id;

  try {
    let poll = await Poll.findById(id);
    let options = [...poll.options];

    let result = [];
    options.forEach((option) => {
      let percentage = (option.vote * 100) / poll.totalVote;
      result.push({
        ...option._doc,
        percentage: percentage ? percentage : 0,
      });
    });

    res.render('viewPoll', { poll, result });
  } catch (error) {
    console.log(error);
  }
};

exports.viewPollPostController = async (req, res, next) => {
  let id = req.params.id;
  let optionId = req.body.option;
  console.log(req.body);

  try {
    let poll = await Poll.findById(id);

    let options = [...poll.options];

    let index = options.findIndex((o) => o.id === optionId);
    options[index].vote = options[index].vote + 1;

    let totalVote = poll.totalVote + 1;

    await Poll.findOneAndUpdate(
      {
        id: poll._id,
      },
      { $set: { options, totalVote } }
    );
    // console.log(index);

    res.redirect('/polls/' + id);
  } catch (error) {
    console.log(error);
  }
};
