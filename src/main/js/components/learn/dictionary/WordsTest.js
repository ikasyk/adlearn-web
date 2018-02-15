import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Sortable from "sortablejs";
import $ from "jquery";

const initialColor = [193, 175, 211];

class WordsTest extends React.Component {
    constructor(props) {
        super(props);
    }

    getCellColor(id) {
        return 'rgb(' + initialColor.map(c => c - 20 * id).join(', ') + ')';
    }

    componentDidMount() {
        $('.learn-test-wrap .learn-test-col').each((i, el) => {
            const sortable = new Sortable(el, {
                draggable: ".learn-test-unit",
                chosenClass: "unit-chosen",
                dataIdAttr: 'data-id'
            });
        });

        // console.log(wrap);
        // wrap.each(el => {
        //     const sortable = new Sortable(el, );
        // });
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    getColumn(columnId) {

        const entries = this.props.data.data.dictionary.entries;

        const size = this.props.data.data.dictionary.size;

        const entryIds = this.shuffle([...Array(entries.length).keys()]);

        return (
            <div className={"learn-test-col col-md-6 col-" + (columnId + 1)} key={columnId}
                 style={{width: 100 / size + '%'}}>
                {entryIds.map(i =>
                    !this.props.learntId.has(entries[i].id.toString()) &&
                    <div key={i} className="learn-test-unit"
                         data-id={entries[i].id}>{entries[i].units[columnId].content}</div>
                )}
            </div>
        );
    }

    handleContinue() {
        const entryCorrect = {};

        const columns = $('.learn-test-wrap .learn-test-col');
        const units = columns.map((i, el) => $('.learn-test-unit', el));

        units[0].each((j, unit) => {
            let correct = true;
            const dataId = $(unit).attr('data-id');

            for (let i = 1; i < units.length; i++) {
                if ($(units[i][j]).attr('data-id') !== dataId) {
                    correct = false;
                    break;
                }
            }
            entryCorrect[dataId] = correct;
        });

        this.props.onContinue(entryCorrect);
    }

    render() {
        const size = this.props.data.data.dictionary.size;
        const handleContinue = this.handleContinue.bind(this);

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">Move rectangles to get correct assignment.</div>
                </div>

                <div className="learn-test-wrap row">
                    {[...Array(size).keys()].map(column =>
                        this.getColumn(column)
                    )}
                </div>

                <div className="learn-continue-wrap text-right">
                    <RaisedButton primary={true} label={'Continue ' + String.fromCharCode(187)}
                                  onClick={handleContinue}/>
                </div>
            </div>
        )
    }
}

export {WordsTest};